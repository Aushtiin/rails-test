
module HasOrderByRelatedId
  extend ActiveSupport::Concern
  
  module ClassMethods
    def order_by_related_ids(field_name, ids)
      order_by = ["CASE"]
      ids.each_with_index do |id, index|
        order_by << "WHEN scheduled_group_id='#{id}' THEN #{index}"
      end
      order_by << "END"
      order(order_by.join(" "))
    end
  end
end